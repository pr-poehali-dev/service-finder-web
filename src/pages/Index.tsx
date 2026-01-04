import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProvidersSection } from '@/components/sections/ProvidersSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ProviderRegistration } from '@/components/sections/ProviderRegistration';
import { trackEvent } from '@/utils/analytics';

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
  { id: 1, name: 'Иван Петров', rating: 4.9, reviews: 156, service: 'Ремонт и строительство', price: 1500, city: 'Москва', isFavorite: false, lat: 55.7558, lng: 37.6173, phone: '+7 (495) 123-45-67' },
  { id: 2, name: 'Мария Сидорова', rating: 4.8, reviews: 98, service: 'Уборка и клининг', price: 800, city: 'Москва', isFavorite: false, lat: 55.7400, lng: 37.6100, phone: '+7 (495) 234-56-78' },
  { id: 3, name: 'Алексей Козлов', rating: 5.0, reviews: 234, service: 'IT и компьютеры', price: 2000, city: 'Москва', isFavorite: false, lat: 55.7700, lng: 37.6300, phone: '+7 (495) 345-67-89' },
  { id: 4, name: 'Елена Новикова', rating: 4.7, reviews: 67, service: 'Красота и здоровье', price: 1200, city: 'Москва', isFavorite: false, lat: 55.7300, lng: 37.6400, phone: '+7 (495) 456-78-90' },
  { id: 5, name: 'Дмитрий Смирнов', rating: 4.6, reviews: 45, service: 'Грузоперевозки', price: 1000, city: 'Москва', isFavorite: false, lat: 55.7600, lng: 37.6500, phone: '+7 (495) 567-89-01' },
  { id: 6, name: 'Ольга Иванова', rating: 4.9, reviews: 122, service: 'Образование', price: 900, city: 'Москва', isFavorite: false, lat: 55.7450, lng: 37.6250, phone: '+7 (495) 678-90-12' },
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

  useEffect(() => {
    trackEvent('page_view', 'engagement', 'Home Page');
  }, []);

  const handleSearch = () => {
    trackEvent('search', 'engagement', searchQuery || 'empty_query');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header
        lang={lang}
        setLang={setLang}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        handleShare={handleShare}
        t={t}
        providersData={providersData}
        services={services}
        pricingPlans={pricingPlans}
      />

      <HeroSection
        t={t}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowMap={setShowMap}
        services={services}
      />

      <ServicesGrid
        t={t}
        lang={lang}
        services={services}
        setShowMap={setShowMap}
      />

      <StatsSection t={t} />

      {showMap && (
        <ProvidersSection
          t={t}
          filteredProviders={filteredProviders}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          minRating={minRating}
          setMinRating={setMinRating}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          resetFilters={resetFilters}
        />
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