import { Company } from '../company/company.model';
import { Customer } from '../customer/customer.model';

export class Installation {
  constructor(
    public id?: number,
    public address?: string,
    public installed_at?: string,
    public panels_number?: number,
    public kind?: string,
    public panels_identification?: number,
    public company?: Company,
    public customer?: Customer
  ) {}
}
