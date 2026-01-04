import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { trackEvent } from '@/utils/analytics';

interface ServicesGridProps {
  t: any;
  lang: 'ru' | 'en' | 'tt';
  services: any[];
  setShowMap: (show: boolean) => void;
  providersData: any[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const ServicesGrid = ({ t, lang, services, setShowMap, providersData, favorites, toggleFavorite }: ServicesGridProps) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">{t.popularServices}</h2>
        <div className="space-y-16">
          {services.map((service) => {
            const serviceName = lang === 'ru' ? service.name_ru : lang === 'en' ? service.name_en : service.name_tt;
            const categoryProviders = providersData.filter(p => p.service === service.name_ru);
            
            if (categoryProviders.length === 0) return null;
            
            return (
              <div key={service.id}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center`}>
                    <Icon name={service.icon as any} className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{serviceName}</h3>
                    <p className="text-sm text-muted-foreground">{categoryProviders.length} {t.providers}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      trackEvent('service_click', 'engagement', serviceName);
                      setShowMap(true);
                    }}
                  >
                    Показать на карте
                    <Icon name="MapPin" className="ml-2" size={16} />
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="bg-white border rounded-xl p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                          {provider.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">{provider.name}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-semibold">{provider.rating}</span>
                            <span className="text-xs text-muted-foreground">({provider.reviews})</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(provider.id)}
                        >
                          <Icon 
                            name="Heart" 
                            className={favorites.includes(provider.id) ? "fill-red-500 text-red-500" : ""}
                            size={18} 
                          />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mb-4 text-sm">
                        <Icon name="MapPin" size={14} className="text-gray-500" />
                        <span>{provider.city}</span>
                        <span className="mx-2">•</span>
                        <span className="font-semibold text-primary">{t.from} {provider.price}₽</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            trackEvent('call_click', 'conversion', provider.name);
                            window.location.href = `tel:${provider.phone}`;
                          }}
                        >
                          <Icon name="Phone" size={14} className="mr-1" />
                          Позвонить
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setShowMap(true);
                            setTimeout(() => {
                              const element = document.querySelector('[data-providers-section]');
                              element?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                        >
                          <Icon name="MapPin" size={14} className="mr-1" />
                          На карте
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};