import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private authService: AuthService
  ) {
    /**
     * Change by K. Brown 7/20/26
     * 
     * Ensure the auth hook is ALWAYS
     * initialized on app startup. This
     * will allow any page to retrieve
     * data based on UID.
     */
    authService.initializeAuthStateChangedHook()
  }
}
