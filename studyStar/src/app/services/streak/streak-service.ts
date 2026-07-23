import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StreakService {

  private storageReady = false;
  private readonly LAST_DATE_KEY = 'lastActivityDate';
  private readonly STREAK_KEY = 'streakCount';

  constructor(
    private storage: Storage
  ) {
    this.init();
  }

  // Initialize Ionic Storage
  private async init() {
    await this.storage.create();
    this.storageReady = true;
  }

  // Get current streak count
  async getStreak(): Promise<number> {
    if (!this.storageReady) await this.init();
    return (await this.storage.get(this.STREAK_KEY)) || 0;
  }

  // Update streak based on today's date
  async updateStreak(): Promise<number> {
    if (!this.storageReady) await this.init();

    const today = new Date();
    const lastDateStr = await this.storage.get(this.LAST_DATE_KEY);
    let streak = await this.getStreak();

    if (lastDateStr) {
      const lastDate = new Date(lastDateStr);
      const diffDays = this.dateDiffInDays(lastDate, today);

      if (diffDays === 1) {
        streak += 1; // continued streak
      } else if (diffDays > 1) {
        streak = 1; // reset streak
      }
      // if diffDays === 0, do nothing (already updated today)
    } else {
      streak = 1; // first streak day
    }

    await this.storage.set(this.LAST_DATE_KEY, today.toISOString());
    await this.storage.set(this.STREAK_KEY, streak);

    return streak;
  }

  // Helper: difference in whole days
  private dateDiffInDays(a: Date, b: Date): number {
    const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utcB - utcA) / (1000 * 60 * 60 * 24));
  }
}



