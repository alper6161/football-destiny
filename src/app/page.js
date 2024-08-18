
import WeekCard from "@/components/WeekCard";

export default async function Home() {


  return (
      <main style={{height: `calc(100vh - 4rem)`, flexDirection: 'column'}} className="centered">
        <WeekCard />

        <div style={{fontWeight: 'bold'}}>
          ALPEREN & BURAK
        </div>
      </main>
  );
}
