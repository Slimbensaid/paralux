import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diagnostic } from './diagnostic.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class DiagnosticService {
  constructor(
    @InjectRepository(Diagnostic)
    private diagnosticRepository: Repository<Diagnostic>,
    private productsService: ProductsService,
  ) {}

  async processDiagnostic(userId: string, answers: any) {
    // 1. AI Logic Simulation (Decision Tree / Rule-based)
    const skinType = this.determineSkinType(answers);
    const recommendations = await this.matchProducts(skinType, answers.concerns);
    const advice = this.generateAdvice(skinType, answers.concerns);

    const diagnostic = this.diagnosticRepository.create({
      userId,
      answers,
      result: {
        detectedSkinType: skinType,
        recommendations,
        advice,
      },
    });

    return this.diagnosticRepository.save(diagnostic);
  }

  private determineSkinType(answers: any): string {
    // Simple logic: in a real scenario, this could be an LLM call or a complex matrix
    if (answers.sensitivity === 'high') return 'Sensitive';
    if (answers.skinType === 'oily') return 'Oily';
    if (answers.skinType === 'dry') return 'Dry';
    return 'Mixed';
  }

  private async matchProducts(skinType: string, concerns: string[]): Promise<string[]> {
    const allProducts = await this.productsService.findAll(undefined, skinType);
    // Filter products that match specific concerns
    return allProducts
      .filter(p => concerns.some(c => p.description.toLowerCase().includes(c.toLowerCase())))
      .map(p => p.id);
  }

  private generateAdvice(skinType: string, concerns: string[]): string {
    const baseAdvice = {
      'Oily': 'Focus on sebum regulation and lightweight hydration.',
      'Dry': 'Prioritize intense hydration and barrier repair.',
      'Sensitive': 'Avoid harsh chemicals and use soothing ingredients.',
      'Mixed': 'Balance T-zone control with targeted cheek hydration.'
    };
    return `${baseAdvice[skinType] || 'Follow a balanced routine.'} Given your concerns with ${concerns.join(', ')}, we recommend double cleansing.`;
  }

  async findByUserId(userId: string) {
    return this.diagnosticRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }
}
