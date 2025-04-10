import { AiServicesComponent } from '../ai-services/ai-services.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { MentorComponent } from '../mentor/mentor.component';
import { OurBlogsComponent } from '../our-blogs/our-blogs.component';
import { OurTeamComponent } from '../our-team/our-team.component';
import { WhoAreWeComponent } from '../who-are-we/who-are-we.component';
import { AboutComponent } from './about.component';
import { Routes } from '@angular/router';

export const DETAILS_ROUTES: Routes = [
  {
    path: '', component: AboutComponent, title: 'MediCare | About Us', children: [
      { path: 'who-are-we', component: WhoAreWeComponent, title: 'MediCare | Who Are We' },
      { path: '', redirectTo: 'who-are-we', pathMatch: 'full' },
      { path: 'our-mentor', component: MentorComponent, title: 'MediCare | Our Mentor' },
      { path: 'our-team', component: OurTeamComponent, title: 'MediCare | Our Team' },
      { path: 'our-ai-services', component: AiServicesComponent, title: 'MediCare | Our Ai Services' },
      { path: 'our-blogs', component: OurBlogsComponent, title: 'MediCare | Our Blogs' },
      { path: 'contact', component: ContactUsComponent, title: 'MediCare | Contact Us' }
    ]
  },
];
