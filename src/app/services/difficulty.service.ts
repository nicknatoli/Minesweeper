import { Injectable } from '@angular/core';
import { Difficulty } from '../models/contracts/difficulty';
import { DifficultyType } from '../enums/difficulty.enum';

@Injectable()
export class DifficultyService {
  private readonly difficulties: Object = {
    [DifficultyType.Beginner]: {height: 8, width: 8, mineCount: 8},
    [DifficultyType.Intermediate]: {height: 16, width: 16, mineCount: 40},
    [DifficultyType.Advanced]: {height: 16, width: 30, mineCount: 99}
  }

  public getDifficulty(type: DifficultyType): Difficulty {
    return this.difficulties[type];
  }
}
