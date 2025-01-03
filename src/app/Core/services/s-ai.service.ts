import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SAiService {
  private geminiApiUrl: string = 'gemini-1.5-flash';
  private apiKey: string = 'AIzaSyCF_UzyUbnSwkNcEwyYSe_E-X3k1r8LQBE';
  private genAI: GoogleGenerativeAI;
  constructor() {
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }
  analyzeTextAndImage(text: string, file: File | null): Observable<any> {
    const model = this.genAI.getGenerativeModel({ model: this.geminiApiUrl });
    return from(
      new Promise<any>(async (resolve, reject) => {
        try {
          let parts;
          if (file) {
            parts = [
              {
                inlineData: {
                  data: await this.fileToBase64(file),
                  mimeType: 'image/jpeg',
                },
              },
              {
                text: `قدم نصيحة حول التخصص الطبي الذي ينبغي الذهاب اليه  اعطني مجموعه من النصائح  قبل الذهاب الي الطبيب  باختصااار + لا تخبرني من انت :  ${text} `,
              },
            ];
          } else {
            parts = [
              {
                text: `حلل الأعراض التالية وقدم نصيحة حول تخصص الطبيب الذي ينبغي الذهاب اليه: ${text}`,
              },
            ];
          }
          const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
          });
          const response = result.response;
          let text_response = response.text();

          // Remove bold markdown
          text_response = text_response.replace(/\*\*/g, '');

          const [speciality, ...adviceParts] = text_response.split('النصيحة:');
          const advice = adviceParts.join('النصيحة:').trim();

          const apiResult: any = {
            advice: advice,
            speciality: speciality.trim(),
          };
          resolve(apiResult);
        } catch (error) {
          console.error('Gemini API Error:', error);
          reject(error);
        }
      })
    );
  }
  private async fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject('Could not convert file to base64');
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
