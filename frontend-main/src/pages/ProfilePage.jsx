import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../components/Card';
import { progressData } from '../data/mockData';

export const ProfilePage = () => (
  <section className="space-y-4">
    <h2 className="text-3xl font-black">Profile</h2>
    <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
      <Card>
        <h3 className="font-bold">Riya Sharma</h3>
        <p className="text-sm text-slate-500">Final year CSE · Target: Product companies</p>
        <div className="mt-4 space-y-2 text-sm">
          <p>Problems solved: <strong>240</strong></p>
          <p>Mock tests completed: <strong>18</strong></p>
          <p>AI sessions this month: <strong>32</strong></p>
        </div>
      </Card>
      <Card>
        <h3 className="mb-3 font-bold">Topic Progress</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="solved" fill="#22D3EE" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  </section>
);
