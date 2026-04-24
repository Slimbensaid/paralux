import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('diagnostics')
export class Diagnostic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('jsonb')
  answers: {
    skinType: string;
    concerns: string[];
    sensitivity: string;
    ageRange: string;
    environment: string;
  };

  @Column()
  result: {
    detectedSkinType: string;
    recommendations: string[]; // IDs of recommended products
    advice: string;
  };

  @CreateDateColumn()
  createdAt: Date;
}
