import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { from, Observable } from 'rxjs';
import { IAi } from '../interfaces/i-ai';

@Injectable({
  providedIn: 'root',
})
export class SAiService {
  private geminiApiUrl: string = 'gemini-2.0-flash-thinking-exp-1219'; // Model name
  private apiKey: string = 'AIzaSyCF_UzyUbnSwkNcEwyYSe_E-X3k1r8LQBE'; // Replace with your actual API key
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  analyzeTextAndImage(text: string, file: File | null): Observable<IAi> {
    const model = this.genAI.getGenerativeModel({ model: this.geminiApiUrl });
    return from(
      new Promise<IAi>(async (resolve, reject) => {
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
                text: `
                 اذا كانت لها علاقه بالمريض اومجال الصحه والعناية الطبية فقط حللها غير هذا لا تحلل الصوره ولا تستخرج منها اي معلومات
                 والأعراض التالية وأعطِ استجابة منظمة بتنسيق JSON تحتوي على:
                - "imageAnalysis": وصف للصورة.
                - "recommendedSpecialization": التخصص الطبي المقترح.
                - "advice": نصيحة قبل الذهاب للدكتور.
                الأعراض: ${text}

                الرجاء إرجاع الاستجابة بتنسيق JSON فقط وباللغة العربية. مثال:
                {
                  "imageAnalysis": "وصف الصورة",
                  "recommendedSpecialization": "التخصص المقترح",
                  "advice": "النصيحة"
                }`
              },
            ];
          } else {
            parts = [
              {
                text: `قم بتحليل الأعراض التالية وأعطِ استجابة منظمة بتنسيق  تحتوي على:
                - "recommendedSpecialization": التخصص الطبي المقترح.
                - "advice": نصيحة قبل الذهاب للدكتور.
                الأعراض: ${text}

                الرجاء إرجاع الاستجابة بتنسيق JSON فقط وباللغة العربية. مثال:
                {
                  "recommendedSpecialization": "التخصص المقترح",
                  "advice": "النصيحة"
                }`
              },
            ];
          }

          // Generate the content using the model
          const result = await model.generateContent({ contents: [{ role: 'user', parts }] });
          const response = result.response;
          let textResponse = response.text();

          // Parse the response to JSON
          const jsonResponse = this.parseResponseToJson(textResponse);

          // Prepare the final response model
          const apiResult: IAi = {
            imageAnalysis: jsonResponse.imageAnalysis || '',
            recommendedSpecialization: jsonResponse.recommendedSpecialization || '',
            advice: jsonResponse.advice || '',
          };

          resolve(apiResult);
        } catch (error) {
          console.error('Gemini API Error:', error);
          reject(error);
        }
      })
    );
  }

  // Function to convert a file to base64 format
  private async fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        } else {
          reject("Could not convert file to base64");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Parse the response to JSON
  private parseResponseToJson(response: string): any {
    try {
      // Remove any unnecessary characters (e.g., ```json```)
      const cleanedResponse = response.replace(/```json|```/g, '').trim();

      // Attempt to parse the response as JSON
      return JSON.parse(cleanedResponse);
    } catch (error) {
      console.error('Failed to parse response to JSON:', error);

      // If parsing fails, extract information manually
      return {
        imageAnalysis: this.extractField(response, 'imageAnalysis'),
        recommendedSpecialization: this.extractField(response, 'recommendedSpecialization'),
        advice: this.extractField(response, 'advice'),
      };
    }
  }

  // Extract a specific field from the response text
  private extractField(response: string, field: string): string {
    const regex = new RegExp(`"${field}":\\s*"([^"]+)"`);
    const match = response.match(regex);
    return match ? match[1] : '';
  }
}
