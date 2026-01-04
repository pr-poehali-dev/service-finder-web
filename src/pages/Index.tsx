import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const translations = {
  ru: {
    title: 'Найдите профессионала для любой задачи',
    subtitle: 'Тысячи проверенных исполнителей готовы помочь вам',
    search: 'Поиск услуг...',
    searchByKeywords: 'Поиск по ключевым словам',
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
    clientReg: 'Регистрация клиента',
    providerReg: 'Регистрация исполнителя',
    free: 'Бесплатно',
    perMonth: '₽/мес',
    pricingTitle: 'Тарифы для исполнителей',
    freeTrialMonths: '3 месяца бесплатно',
    basic: 'Базовый',
    standard: 'Стандарт',
    premium: 'Премиум',
    share: 'Поделиться',
    addToFavorites: 'В избранное',
    chooseService: 'Выберите услугу',
    favorites: 'Избранное',
    filters: 'Фильтры',
    priceRange: 'Диапазон цен',
    minRating: 'Минимальный рейтинг',
    selectDate: 'Выберите дату',
    applyFilters: 'Применить',
    resetFilters: 'Сбросить',
    found: 'Найдено',
    providers: 'исполнителей',
    noFavorites: 'Нет избранных исполнителей',
  },
  en: {
    title: 'Find a professional for any task',
    subtitle: 'Thousands of verified service providers ready to help',
    search: 'Search services...',
    searchByKeywords: 'Search by keywords',
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
    clientReg: 'Client Registration',
    providerReg: 'Provider Registration',
    free: 'Free',
    perMonth: '₽/month',
    pricingTitle: 'Provider Pricing',
    freeTrialMonths: '3 months free',
    basic: 'Basic',
    standard: 'Standard',
    premium: 'Premium',
    share: 'Share',
    addToFavorites: 'Add to Favorites',
    chooseService: 'Choose service',
    favorites: 'Favorites',
    filters: 'Filters',
    priceRange: 'Price range',
    minRating: 'Minimum rating',
    selectDate: 'Select date',
    applyFilters: 'Apply',
    resetFilters: 'Reset',
    found: 'Found',
    providers: 'providers',
    noFavorites: 'No favorite providers',
  },
  tt: {
    title: 'Теләсә нинди эш өчен профессионал табыгыз',
    subtitle: 'Меңләгән тикшерелгән башкаручылар сезгә ярдәм итәргә әзер',
    search: 'Хезмәтләр эзләү...',
    searchByKeywords: 'Ачкыч сүзләр буенча эзләү',
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
    clientReg: 'Клиент теркәлүе',
    providerReg: 'Башкаручы теркәлүе',
    free: 'Бушлай',
    perMonth: '₽/ай',
    pricingTitle: 'Башкаручылар өчен тарифлар',
    freeTrialMonths: '3 ай бушлай',
    basic: 'Базовый',
    standard: 'Стандарт',
    premium: 'Премиум',
    share: 'Уртаклашу',
    addToFavorites: 'Сайланганга',
    chooseService: 'Хезмәт сайлагыз',
    favorites: 'Сайланганнар',
    filters: 'Фильтрлар',
    priceRange: 'Бәя диапазоны',
    minRating: 'Минималь рейтинг',
    selectDate: 'Дата сайлагыз',
    applyFilters: 'Кулланырга',
    resetFilters: 'Чистарту',
    found: 'Табылды',
    providers: 'башкаручы',
    noFavorites: 'Сайланган башкаручылар юк',
  },
};

const services = [
  { id: 1, name_ru: 'Ремонт и строительство', name_en: 'Repair & Construction', name_tt: 'Ремонт һәм төзелеш', icon: 'Hammer', color: 'bg-blue-500', image: 'https://cdn.poehali.dev/projects/b6103b3f-1ab3-4c50-8df0-9b003473f0a3/files/cf1d37fc-5890-414f-883c-494651611bf1.jpg' },
  { id: 2, name_ru: 'Уборка и клининг', name_en: 'Cleaning Services', name_tt: 'Чистарту хезмәте', icon: 'Sparkles', color: 'bg-green-500', image: 'https://cdn.poehali.dev/projects/b6103b3f-1ab3-4c50-8df0-9b003473f0a3/files/d8955a6d-ad0d-468e-a384-98557dc2e600.jpg' },
  { id: 3, name_ru: 'Грузоперевозки', name_en: 'Transportation', name_tt: 'Йөк ташу', icon: 'Truck', color: 'bg-orange-500', image: 'https://cdn.poehali.dev/projects/b6103b3f-1ab3-4c50-8df0-9b003473f0a3/files/2e8bb93b-7294-46f6-9a03-430e3e3d4e9b.jpg' },
  { id: 4, name_ru: 'IT и компьютеры', name_en: 'IT & Computers', name_tt: 'IT һәм компьютерлар', icon: 'Laptop', color: 'bg-purple-500', image: 'https://cdn.poehali.dev/projects/b6103b3f-1ab3-4c50-8df0-9b003473f0a3/files/660816af-33d5-4a51-a8e8-935009f9fa26.jpg' },
  { id: 5, name_ru: 'Красота и здоровье', name_en: 'Beauty & Health', name_tt: 'Матурлык һәм сәламәтлек', icon: 'Heart', color: 'bg-pink-500', image: 'https://cdn.poehali.dev/projects/b6103b3f-1ab3-4c50-8df0-9b003473f0a3/files/790b056d-3918-4102-8ec8-b6de89573d45.jpg' },
  { id: 6, name_ru: 'Образование', name_en: 'Education', name_tt: 'Мәгариф', icon: 'GraduationCap', color: 'bg-indigo-500', image: 'https://cdn.poehali.dev/projects/b6103b3f-1ab3-4c50-8df0-9b003473f0a3/files/7d609203-f598-4307-b59c-d371dc489e54.jpg' },
  { id: 7, name_ru: 'Юридические услуги', name_en: 'Legal Services', name_tt: 'Юридик хезмәтләр', icon: 'Scale', color: 'bg-red-500', image: 'https://cdn.poehali.dev/projects/b6103b3f-1ab3-4c50-8df0-9b003473f0a3/files/219dfc8d-2bea-4799-89fe-4fbb9e8dd2c3.jpg' },
  { id: 8, name_ru: 'Фото и видео', name_en: 'Photo & Video', name_tt: 'Фото һәм видео', icon: 'Camera', color: 'bg-yellow-500', image: 'https://cdn.poehali.dev/projects/b6103b3f-1ab3-4c50-8df0-9b003473f0a3/files/d634eecb-d57e-445d-9515-e93d661cb119.jpg' },
];

const providersData = [
  { id: 1, name: 'Иван Петров', rating: 4.9, reviews: 156, service: 'Ремонт и строительство', price: 1500, city: 'Москва', isFavorite: false },
  { id: 2, name: 'Мария Сидорова', rating: 4.8, reviews: 98, service: 'Уборка и клининг', price: 800, city: 'Москва', isFavorite: false },
  { id: 3, name: 'Алексей Козлов', rating: 5.0, reviews: 234, service: 'IT и компьютеры', price: 2000, city: 'Москва', isFavorite: false },
  { id: 4, name: 'Елена Новикова', rating: 4.7, reviews: 67, service: 'Красота и здоровье', price: 1200, city: 'Москва', isFavorite: false },
  { id: 5, name: 'Дмитрий Смирнов', rating: 4.6, reviews: 45, service: 'Грузоперевозки', price: 1000, city: 'Москва', isFavorite: false },
  { id: 6, name: 'Ольга Иванова', rating: 4.9, reviews: 122, service: 'Образование', price: 900, city: 'Москва', isFavorite: false },
];

const pricingPlans = [
  { name: 'basic', price: 500, features: ['Базовый профиль', 'До 10 заявок/мес', 'Поддержка 24/7'] },
  { name: 'standard', price: 1200, features: ['Расширенный профиль', 'До 50 заявок/мес', 'Приоритет в поиске', 'Аналитика'] },
  { name: 'premium', price: 2000, features: ['Премиум профиль', 'Безлимит заявок', 'Топ в результатах', 'Персональный менеджер'] },
];

const Index = () => {
  const [lang, setLang] = useState<'ru' | 'en' | 'tt'>('ru');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [showMap, setShowMap] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [minRating, setMinRating] = useState([0]);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const t = translations[lang];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ServiceHub',
          text: t.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована!');
    }
  };

  const resetFilters = () => {
    setPriceRange([0, 3000]);
    setMinRating([0]);
    setSelectedDate(undefined);
  };

  const filteredProviders = providersData.filter(provider => {
    const matchesPrice = provider.price >= priceRange[0] && provider.price <= priceRange[1];
    const matchesRating = provider.rating >= minRating[0];
    return matchesPrice && matchesRating;
  });

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="Heart" size={20} />
                    {favorites.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {favorites.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-semibold">{t.favorites}</h4>
                    {favorites.length === 0 ? (
                      <p className="text-sm text-muted-foreground">{t.noFavorites}</p>
                    ) : (
                      <div className="space-y-2">
                        {providersData.filter(p => favorites.includes(p.id)).map(provider => (
                          <div key={provider.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{provider.name}</p>
                              <p className="text-xs text-muted-foreground">{provider.service}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(provider.id)}>
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Icon name="Share2" size={20} />
              </Button>

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
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
                        <h3 className="text-xl font-bold mb-2">{t.freeTrialMonths}</h3>
                        <p className="text-sm text-muted-foreground">Затем выберите удобный тариф</p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {pricingPlans.map((plan) => (
                          <Card key={plan.name} className={plan.name === 'standard' ? 'border-primary border-2' : ''}>
                            <CardHeader>
                              <CardTitle className="capitalize">{t[plan.name as keyof typeof t]}</CardTitle>
                              <CardDescription className="text-3xl font-bold text-primary">
                                {plan.price}₽<span className="text-sm text-muted-foreground">{t.perMonth}</span>
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-center gap-2 text-sm">
                                    <Icon name="Check" size={16} className="text-green-500" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <Input placeholder="Имя" />
                      <Input placeholder="Email" type="email" />
                      <Input placeholder="Телефон" />
                      <Input placeholder="Город" />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={t.chooseService} />
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

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img 
                src="https://cdn.poehali.dev/projects/b6103b3f-1ab3-4c50-8df0-9b003473f0a3/files/65d527e3-68ff-4060-92aa-577374d93350.jpg" 
                alt="Services collage" 
                className="rounded-2xl shadow-2xl col-span-2 h-[300px] object-cover"
              />
              <img 
                src="https://cdn.poehali.dev/projects/b6103b3f-1ab3-4c50-8df0-9b003473f0a3/files/85af7cd6-f82e-4614-aed7-2c4cf0dc43db.jpg" 
                alt="Professionals" 
                className="rounded-2xl shadow-lg h-[200px] object-cover"
              />
              <img 
                src={services[0].image}
                alt="Service" 
                className="rounded-2xl shadow-lg h-[200px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 text-center">{t.searchByKeywords}</h2>
          <div className="flex gap-4">
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
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.popularServices}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all hover:scale-105 hover:shadow-2xl animate-fade-in h-[280px]"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setShowMap(true)}
              >
                <img
                  src={service.image}
                  alt={lang === 'ru' ? service.name_ru : lang === 'en' ? service.name_en : service.name_tt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <Icon name={service.icon as any} className="text-white" size={20} />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-xl">
                    {lang === 'ru' ? service.name_ru : lang === 'en' ? service.name_en : service.name_tt}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showMap && (
        <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">{t.nearYou}</h2>
                <p className="text-muted-foreground mt-2">
                  {t.found} {filteredProviders.length} {t.providers}
                </p>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg">
                    <Icon name="SlidersHorizontal" className="mr-2" size={20} />
                    {t.filters}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-medium">{t.priceRange}</label>
                        <span className="text-sm text-muted-foreground">
                          {priceRange[0]}₽ - {priceRange[1]}₽
                        </span>
                      </div>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={3000}
                        step={100}
                        className="mb-4"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-medium">{t.minRating}</label>
                        <span className="text-sm text-muted-foreground">
                          {minRating[0].toFixed(1)} ⭐
                        </span>
                      </div>
                      <Slider
                        value={minRating}
                        onValueChange={setMinRating}
                        min={0}
                        max={5}
                        step={0.1}
                        className="mb-4"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">{t.selectDate}</label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        locale={ru}
                        className="rounded-md border"
                      />
                      {selectedDate && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Выбрано: {format(selectedDate, 'dd MMMM yyyy', { locale: ru })}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={resetFilters} variant="outline" className="flex-1">
                        {t.resetFilters}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {filteredProviders.map((provider) => (
                <Card key={provider.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl">
                          {provider.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl mb-1">{provider.name}</CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(provider.id)}
                          >
                            <Icon 
                              name="Heart" 
                              className={favorites.includes(provider.id) ? "fill-red-500 text-red-500" : ""}
                              size={20} 
                            />
                          </Button>
                        </div>
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
        </section>
      )}

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
