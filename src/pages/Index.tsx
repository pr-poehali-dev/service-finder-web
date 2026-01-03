import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const translations = {
  ru: {
    title: 'Найдите профессионала для любой задачи',
    subtitle: 'Тысячи проверенных исполнителей готовы помочь вам',
    search: 'Поиск услуг...',
    searchBtn: 'Найти',
    popularServices: 'Популярные услуги',
    howItWorks: 'Как это работает',
    forClients: 'Для клиентов',
    forProviders: 'Для исполнителей',
    login: 'Войти',
    register: 'Регистрация',
    rating: 'Рейтинг',
    reviews: 'отзывов',
    from: 'от',
    nearYou: 'Исполнители рядом с вами',
    city: 'Ваш город',
    step1: 'Опишите задачу',
    step1desc: 'Расскажите, какая услуга вам нужна',
    step2: 'Выберите исполнителя',
    step2desc: 'Сравните предложения на карте',
    step3: 'Получите результат',
    step3desc: 'Оплатите после выполнения работы',
    clientReg: 'Регистрация клиента',
    providerReg: 'Регистрация исполнителя',
    free: 'Бесплатно',
    perMonth: '₽/мес',
  },
  en: {
    title: 'Find a professional for any task',
    subtitle: 'Thousands of verified service providers ready to help',
    search: 'Search services...',
    searchBtn: 'Search',
    popularServices: 'Popular Services',
    howItWorks: 'How It Works',
    forClients: 'For Clients',
    forProviders: 'For Providers',
    login: 'Login',
    register: 'Register',
    rating: 'Rating',
    reviews: 'reviews',
    from: 'from',
    nearYou: 'Service providers near you',
    city: 'Your city',
    step1: 'Describe the task',
    step1desc: 'Tell us what service you need',
    step2: 'Choose a provider',
    step2desc: 'Compare offers on the map',
    step3: 'Get results',
    step3desc: 'Pay after work is completed',
    clientReg: 'Client Registration',
    providerReg: 'Provider Registration',
    free: 'Free',
    perMonth: '₽/month',
  },
  tt: {
    title: 'Теләсә нинди эш өчен профессионал табыгыз',
    subtitle: 'Меңләгән тикшерелгән башкаручылар сезгә ярдәм итәргә әзер',
    search: 'Хезмәтләр эзләү...',
    searchBtn: 'Эзләү',
    popularServices: 'Популяр хезмәтләр',
    howItWorks: 'Ничек эшли',
    forClients: 'Клиентлар өчен',
    forProviders: 'Башкаручылар өчен',
    login: 'Керү',
    register: 'Теркәлү',
    rating: 'Рейтинг',
    reviews: 'бәяләү',
    from: 'башлап',
    nearYou: 'Сезгә якын башкаручылар',
    city: 'Сезнең шәһәр',
    step1: 'Эшне тасвирлагыз',
    step1desc: 'Сезгә нинди хезмәт кирәк икәнен әйтегез',
    step2: 'Башкаручы сайлагыз',
    step2desc: 'Картада тәкъдимнәрне чагыштырыгыз',
    step3: 'Нәтиҗә алыгыз',
    step3desc: 'Эш тәмамлангач түләгез',
    clientReg: 'Клиент теркәлүе',
    providerReg: 'Башкаручы теркәлүе',
    free: 'Бушлай',
    perMonth: '₽/ай',
  },
};

const services = [
  { id: 1, name_ru: 'Ремонт и строительство', name_en: 'Repair & Construction', name_tt: 'Ремонт һәм төзелеш', icon: 'Hammer', color: 'bg-blue-500' },
  { id: 2, name_ru: 'Уборка и клининг', name_en: 'Cleaning Services', name_tt: 'Чистарту хезмәте', icon: 'Sparkles', color: 'bg-green-500' },
  { id: 3, name_ru: 'Грузоперевозки', name_en: 'Transportation', name_tt: 'Йөк ташу', icon: 'Truck', color: 'bg-orange-500' },
  { id: 4, name_ru: 'IT и компьютеры', name_en: 'IT & Computers', name_tt: 'IT һәм компьютерлар', icon: 'Laptop', color: 'bg-purple-500' },
  { id: 5, name_ru: 'Красота и здоровье', name_en: 'Beauty & Health', name_tt: 'Матурлык һәм сәламәтлек', icon: 'Heart', color: 'bg-pink-500' },
  { id: 6, name_ru: 'Образование', name_en: 'Education', name_tt: 'Мәгариф', icon: 'GraduationCap', color: 'bg-indigo-500' },
  { id: 7, name_ru: 'Юридические услуги', name_en: 'Legal Services', name_tt: 'Юридик хезмәтләр', icon: 'Scale', color: 'bg-red-500' },
  { id: 8, name_ru: 'Фото и видео', name_en: 'Photo & Video', name_tt: 'Фото һәм видео', icon: 'Camera', color: 'bg-yellow-500' },
];

const providers = [
  { id: 1, name: 'Иван Петров', rating: 4.9, reviews: 156, service: 'Ремонт и строительство', price: '1500', avatar: '', city: 'Москва', lat: 55.7558, lng: 37.6173 },
  { id: 2, name: 'Мария Сидорова', rating: 4.8, reviews: 98, service: 'Уборка и клининг', price: '800', avatar: '', city: 'Москва', lat: 55.7400, lng: 37.6100 },
  { id: 3, name: 'Алексей Козлов', rating: 5.0, reviews: 234, service: 'IT и компьютеры', price: '2000', avatar: '', city: 'Москва', lat: 55.7700, lng: 37.6300 },
  { id: 4, name: 'Елена Новикова', rating: 4.7, reviews: 67, service: 'Красота и здоровье', price: '1200', avatar: '', city: 'Москва', lat: 55.7300, lng: 37.6400 },
];

const Index = () => {
  const [lang, setLang] = useState<'ru' | 'en' | 'tt'>('ru');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [showMap, setShowMap] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Briefcase" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ServiceHub
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Select value={lang} onValueChange={(v) => setLang(v as 'ru' | 'en' | 'tt')}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                  <SelectItem value="tt">Татарча</SelectItem>
                </SelectContent>
              </Select>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">{t.login}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t.login}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Password" type="password" />
                    <Button className="w-full">{t.login}</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>{t.register}</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t.register}</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="client" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="client">{t.forClients}</TabsTrigger>
                      <TabsTrigger value="provider">{t.forProviders}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="client" className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="font-semibold">{t.clientReg}</span>
                        <Badge className="bg-green-500">{t.free}</Badge>
                      </div>
                      <Input placeholder="Имя" />
                      <Input placeholder="Email" type="email" />
                      <Input placeholder="Телефон" />
                      <Input placeholder="Пароль" type="password" />
                      <Button className="w-full">{t.register}</Button>
                    </TabsContent>
                    <TabsContent value="provider" className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <span className="font-semibold">{t.providerReg}</span>
                        <Badge className="bg-blue-500">2990 {t.perMonth}</Badge>
                      </div>
                      <Input placeholder="Имя" />
                      <Input placeholder="Email" type="email" />
                      <Input placeholder="Телефон" />
                      <Input placeholder="Город" />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.id} value={s.id.toString()}>
                              {lang === 'ru' ? s.name_ru : lang === 'en' ? s.name_en : s.name_tt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input placeholder="Пароль" type="password" />
                      <Button className="w-full">{t.register}</Button>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {t.subtitle}
          </p>

          <div className="flex gap-4 max-w-2xl mx-auto mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Input
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 text-lg"
            />
            <Button size="lg" className="h-14 px-8" onClick={() => setShowMap(true)}>
              <Icon name="Search" className="mr-2" />
              {t.searchBtn}
            </Button>
          </div>

          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Icon name="MapPin" size={16} />
            <span>{t.city}:</span>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[150px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Москва">Москва</SelectItem>
                <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                <SelectItem value="Казань">Казань</SelectItem>
                <SelectItem value="Екатеринбург">Екатеринбург</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.popularServices}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  setSelectedService(service.id);
                  setShowMap(true);
                }}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon name={service.icon as any} className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-lg">
                    {lang === 'ru' ? service.name_ru : lang === 'en' ? service.name_en : service.name_tt}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {showMap && (
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{t.nearYou}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-100 rounded-xl h-[500px] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="MapPin" size={48} className="mx-auto mb-4 text-primary" />
                    <p className="text-lg font-semibold">Google Maps</p>
                    <p className="text-sm text-muted-foreground">{selectedCity}</p>
                  </div>
                </div>
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className="absolute w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform shadow-lg"
                    style={{
                      left: `${20 + (provider.id * 15)}%`,
                      top: `${30 + (provider.id * 10)}%`,
                    }}
                    title={provider.name}
                  >
                    {provider.id}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {providers.map((provider) => (
                  <Card key={provider.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl">
                            {provider.name.split(' ').map((n) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-1">{provider.name}</CardTitle>
                          <CardDescription>{provider.service}</CardDescription>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                              <span className="font-semibold">{provider.rating}</span>
                              <span className="text-sm text-muted-foreground">
                                ({provider.reviews} {t.reviews})
                              </span>
                            </div>
                            <Badge variant="outline">
                              <Icon name="MapPin" size={12} className="mr-1" />
                              {provider.city}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">{t.from}</div>
                          <div className="text-2xl font-bold text-primary">{provider.price}₽</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Icon name="MessageCircle" className="mr-2" size={18} />
                        Написать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t.howItWorks}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2 animate-fade-in">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <CardTitle className="mb-2">{t.step1}</CardTitle>
                <CardDescription className="text-base">{t.step1desc}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <CardTitle className="mb-2">{t.step2}</CardTitle>
                <CardDescription className="text-base">{t.step2desc}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center border-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <CardTitle className="mb-2">{t.step3}</CardTitle>
                <CardDescription className="text-base">{t.step3desc}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Briefcase" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold">ServiceHub</span>
          </div>
          <p className="text-gray-400">© 2026 ServiceHub. {lang === 'ru' ? 'Все права защищены' : lang === 'en' ? 'All rights reserved' : 'Барлык хокуклар сакланган'}.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
