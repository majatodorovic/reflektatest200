import Head from 'next/head'

const Seo = ({title, description}) => {
    return (
        <Head>
            <title>Reflekta | Dobrodošli na našu online prodavnicu</title>
            <meta name='description' content={description ?? 'Reflekta web shop.'} />
            <link rel='icon' type='image/x-icon' href='../public/favicon.ico' />
        </Head>
    )
}

export default Seo