import { useEffect, useState } from "react";
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { newsFeed } from '../data/mockData';

export const NewsPage = () => {

  const [activeTab, setActiveTab] = useState("All");
  const [news,setNews] = useState([]);

useEffect(()=>{
  fetch("http://localhost:3000/api/news")
    .then(res=>res.json())
    .then(data=>setNews(data));
},[]);

  const filteredNews =
    activeTab === "All"
      ? newsFeed
      : newsFeed.filter((news) => news.category === activeTab);

  return (
    <section className="space-y-4">

      <div className="rounded-2xl border border-accent/50 bg-accent/10 p-4">
        <p className="text-xs uppercase tracking-widest text-accent">Featured</p>
        <h2 className="text-xl font-black">Placement season 2026 has officially started.</h2>
      </div>

      <div className="flex gap-2 text-sm">
        {['All', 'Hiring', 'Referral', 'Contest'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-3 py-1 border
              ${activeTab === tab
                ? "bg-accent text-white border-accent"
                : "border-borderTone-light dark:border-borderTone-dark"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filteredNews.map((news) => (
          <Card key={news.id}>
            <h3 className="font-bold">{news.title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {news.source} · {news.date}
            </p>
            <div className="mt-3">
              <Badge tone="info">{news.category}</Badge>
            </div>
          </Card>
        ))}
      </div>

    </section>
  );
};