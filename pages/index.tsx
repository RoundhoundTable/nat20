import type { NextPage } from 'next'
import Image from 'next/image';
import Logo from '../assets/images/logo.svg'
import Button from '../components/Button';

const Home: NextPage = () => {
    

    return (
        <div className="flex flex-col gap-28 p-5 bg-[#343642]">
            <Image src={Logo} />
            <div className="flex flex-col p-10 gap-5 justify items-center">
                <Button>Login</Button>
                <Button>Register</Button>
            </div>
        </div>
    )
};

export default Home