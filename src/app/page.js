import WeekCard from "@/components/WeekCard";
import ManagerCard from "@/components/ManagerCard";
import FacilityCard from "@/components/FacilityCard";
import MoneyCard from "@/components/MoneyCard";

export default async function Home() {

  return (
      <main style={{}} className="centered page">
          <div style={{display: 'grid', gridTemplateColumns: 'auto auto auto', height: '100%', flex: 1, columnGap: '.5rem', rowGap: '.5rem', padding: '0 1rem'}}>
              <div className="widget">
                  <WeekCard />
              </div>
              <div className="widget">
                  <ManagerCard />
              </div>
              <div className="widget">
                  <MoneyCard />
              </div>
              <div className="widget">
                  <FacilityCard />
              </div>
              <div className="widget">
                  Team
              </div>
              <div className="widget">
                  League
              </div>
          </div>
      </main>
  );
}
