import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { trackEvent } from '@/utils/analytics';

interface HeroSectionProps {
  t: any;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setShowMap: (show: boolean) => void;
  services: any[];
}

export const HeroSection = ({ t, searchQuery, setSearchQuery, setShowMap, services }: HeroSectionProps) => {
  const handleSearch = () => {
    trackEvent('search', 'engagement', searchQuery || 'empty_query');
    setShowMap(true);
  };
  return (
    <>
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
            <Button size="lg" className="h-14 px-8" onClick={handleSearch}>
              <Icon name="Search" className="mr-2" />
              {t.searchBtn}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};