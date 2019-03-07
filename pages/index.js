import {useState, useEffect} from 'react';
import cowsay from 'cowsay-browser';
import fetch from 'isomorphic-unfetch';

const fetchStars = async () => {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return json.stargazers_count
}

function Home({stars}) {
    const [greeting, setGreeting] = useState('ahoi');
    const [clientSideFetchedStars, setStars] = useState(0);

    const toggleGreeting = () => {
        if (greeting === 'ahoi') {
            setGreeting('Hello there');
        } else {
            setGreeting('ahoi');
        }
    }

    const _fetchStars = async () => {
        setStars(await fetchStars())
    }

    useEffect(() => {
        _fetchStars()
    }, []);

    return (
        <div>
            <div>{cowsay.say({ text: greeting })}</div>
            <div>Nextjs has {stars} Stars on Github! Client Side fetched: {clientSideFetchedStars}</div>
            <button onClick={toggleGreeting}>toggleGreeting</button>
        </div>
    );
}

Home.getInitialProps = async ({ req }) => {
    const stars = await fetchStars()
    return { stars }
}

export default Home