import WeekCard from "@/components/WeekCard";
import ManagerCard from "@/components/ManagerCard";

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
                  TEST
              </div>
              <div className="widget">
                  TEST
              </div>
          </div>
      </main>
  );
}
