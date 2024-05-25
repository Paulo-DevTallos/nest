import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'node:crypto';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, type: 'datetime' })
  started_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  cancelled_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  forecasted_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  finished_at: Date | null;

  @Column({ type: 'simple-enum' })
  status: ProjectStatus = ProjectStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      cancelled_at?: Date | null;
      forecasted_at?: Date | null;
      finished_at?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();

    if (props?.started_at) this.start(props.started_at);
  }

  // abstraindo regra de negocio que irá se preocupar em apenas iniciar o projeto
  /**
   * A finalidade de inserir regras de negocio minuciosa dentro da entidade está em evitar duplicação de
   * codigo dentro das camadas de regras de negocio como useCase, por exemplo
   */
  start(started_at: Date) {
    if (this.status === ProjectStatus.Active) {
      throw new Error('Cannot start active project');
    }

    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot start completed project');
    }

    if (this.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot start cancelled project');
    }

    this.started_at = started_at;
    this.status = ProjectStatus.Active;
  }
}
