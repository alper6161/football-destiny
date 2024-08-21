'use client'
import {useRouter, usePathname} from "next/navigation";
import {useStore} from "@/zustand/zustand";

const Header = () => {
    const {weekResults, gameWeek, setGameWeek, setWeekResults} = useStore((state) => state)
    const router = useRouter();
    const pathName = usePathname();

    const onNextClick = () => {
        switch (pathName) {
            case '/':
                router.push('score')
                break;
            case '/score':
                if(weekResults) {
                    router.push('/');
                    setGameWeek(gameWeek+1);
                    setWeekResults(null);
                } else {
                    router.push('match');
                }
                break;
            case '/match':
                router.push('/score?results=true')
                break;
        }
    };
    return (
        <div style={{height: '4rem', display: 'flex', justifyContent: "space-between", fontSize: '36px', borderBottom: '1px solid #7a8893'}}>
            <div>
                Logo
                centered
            </div>
            <div>
                Header
            </div>
            <div>
                <button style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    fontSize: '24px',
                    cursor: 'pointer',
                    height: '100%',
                    width: '7rem'
                }} onClick={() => onNextClick()}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Header
