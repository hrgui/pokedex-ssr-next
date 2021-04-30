import Link from "next/link";

export default function Pokemon({ pokemon, id }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>{pokemon.name}</h1>
      <img
        style={{ margin: "0 auto" }}
        width={300}
        src={pokemon.sprites.other["official-artwork"]["front_default"]}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href={`/${+id - 1}`}>
          <a>Prev</a>
        </Link>
        <Link href={`/${+id + 1}`}>
          <a>Next</a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.params.id}`);
  const pokemon = await res.json();

  return {
    props: { pokemon, id: context.params.id },
  };
}
