import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useEffect, useState } from 'react';

interface StatsSectionProps {
  t: any;
}

export const StatsSection = ({ t }: StatsSectionProps) => {
  const [stats, setStats] = useState({
    visitors: 0,
    requests: 0,
    providers: 0,
    avgRating: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        visitors: Math.floor(Math.random() * 1000) + 500,
        requests: Math.floor(Math.random() * 200) + 100,
        providers: 156,
        avgRating: 4.8,
      });
    }, 3000);

    setStats({
      visitors: 847,
      requests: 124,
      providers: 156,
      avgRating: 4.8,
    });

    return () => clearInterval(interval);
  }, []);

  const statsData = [
    {
      title: 'Посетителей сегодня',
      value: stats.visitors,
      icon: 'Users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: '+12%',
    },
    {
      title: 'Заявок за неделю',
      value: stats.requests,
      icon: 'FileText',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: '+23%',
    },
    {
      title: 'Исполнителей',
      value: stats.providers,
      icon: 'Briefcase',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: '+8%',
    },
    {
      title: 'Средний рейтинг',
      value: stats.avgRating.toFixed(1),
      icon: 'Star',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      trend: '4.8/5.0',
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Статистика платформы</h2>
          <p className="text-muted-foreground">Актуальные данные обновляются в реальном времени</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon name={stat.icon as any} className={stat.color} size={24} />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.trend}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-3xl font-bold mb-1">{stat.value}</CardTitle>
                <CardDescription>{stat.title}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" className="text-blue-600" size={20} />
                Популярные услуги
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Ремонт и строительство', percent: 28 },
                  { name: 'IT и компьютеры', percent: 22 },
                  { name: 'Уборка и клининг', percent: 18 },
                  { name: 'Красота и здоровье', percent: 15 },
                  { name: 'Образование', percent: 17 },
                ].map((service, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{service.name}</span>
                      <span className="text-sm text-muted-foreground">{service.percent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${service.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="MapPin" className="text-purple-600" size={20} />
                Активность по городам
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { city: 'Москва', count: 847, percent: 45 },
                  { city: 'Санкт-Петербург', count: 523, percent: 28 },
                  { city: 'Казань', count: 312, percent: 16 },
                  { city: 'Екатеринбург', count: 208, percent: 11 },
                ].map((city, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-medium">{city.city}</p>
                        <p className="text-sm text-muted-foreground">{city.count} посетителей</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{city.percent}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
