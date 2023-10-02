import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  weather: number;

  @Column({ type: 'text', nullable: false })
  flag: string | null;
}
