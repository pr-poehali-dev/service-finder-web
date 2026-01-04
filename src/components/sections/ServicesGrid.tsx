import Icon from '@/components/ui/icon';
import { trackEvent } from '@/utils/analytics';

interface ServicesGridProps {
  t: any;
  lang: 'ru' | 'en' | 'tt';
  services: any[];
  setShowMap: (show: boolean) => void;
  setSelectedService: (service: string) => void;
}

export const ServicesGrid = ({ t, lang, services, setShowMap, setSelectedService }: ServicesGridProps) => {
  const handleServiceClick = (service: any) => {
    const serviceName = lang === 'ru' ? service.name_ru : lang === 'en' ? service.name_en : service.name_tt;
    trackEvent('service_click', 'engagement', serviceName);
    setSelectedService(service.name_ru);
    setShowMap(true);
    setTimeout(() => {
      const element = document.querySelector('[data-providers-section]');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{t.popularServices}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all hover:scale-105 hover:shadow-2xl animate-fade-in h-[280px]"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleServiceClick(service)}
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
  );
};