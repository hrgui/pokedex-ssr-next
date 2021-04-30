import Link from "next/link";
import Head from "next/head";

export default function Pokemon({ pokemon, id }) {
  return (
    <>
      <Head>
        <title>#{pokemon.name}</title>
        <meta name="twitter:card" content="summary" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={pokemon.name} />
        <meta
          property="og:image"
          content={pokemon.sprites.other["official-artwork"]["front_default"]}
        />
      </Head>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1>{pokemon.name}</h1>
        <img
          style={{ margin: "0 auto" }}
          width={300}
          src={pokemon.sprites.other["official-artwork"]["front_default"]}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {id > 1 && (
            <Link href={`/${+id - 1}`}>
              <a>Prev</a>
            </Link>
          )}
          <Link href={`/${+id + 1}`}>
            <a>Next</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.params.id}`);
  const pokemon = await res.json();

  return {
    props: { pokemon, id: context.params.id },
  };
}
