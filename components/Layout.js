import Head from 'next/head'

export default function Layout({title, keywords, description, children}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>
            {children}

        </div>
    )
}


Layout.defaultProps = {
    title: "Green Events | Let's Plant Together",
    description: "Find the upcoming events of planting and making the world Green!",
    keywords: "nature, plants, motherNature, green, saveNature, loveNature, liveWithNature"
}
