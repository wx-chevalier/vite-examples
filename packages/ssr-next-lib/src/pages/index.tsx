import fs from 'fs';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';

import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import styles from '../styles/home.module.css';
import utilStyles from '../styles/utils.module.css';

export default function Home({
  allPostsData,
  htmlSnapshot,
}: {
  allPostsData: any;
  htmlSnapshot: string;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{` `}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <p className={styles.description}>This is not an official starter!</p>
      </main>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }: any) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=typescript-nextjs-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{` `}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>

      <div
        style={{ display: 'none' }}
        dangerouslySetInnerHTML={{ __html: htmlSnapshot }}
      />
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const htmlSnapshot = fs.readFileSync(
    path.resolve(process.cwd(), 'snapshots', 'index.snapshot.html'),
    'utf8',
  );

  return {
    props: {
      allPostsData,
      htmlSnapshot,
    },
  };
}
