import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { companies } from '../data/mockData';

export const CompanyPrepPage = () => (
  <section className="space-y-4">
    <h2 className="text-3xl font-black">Company Preparation</h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {companies.map((company) => (
        <Card key={company.name}>
          <h3 className="text-lg font-bold">{company.name}</h3>
          <div className="mt-3 flex gap-2">
            <Badge tone="success">{company.frequency}</Badge>
            <Badge tone={company.difficulty === 'Hard' ? 'warning' : 'info'}>{company.difficulty}</Badge>
          </div>
        </Card>
      ))}
    </div>
  </section>
);
