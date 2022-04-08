import Link from "next/link"
import styled, { css } from "styled-components"
import { getParks } from "../../utils/contentful-helper"

const ParkLink = styled.a`
  display: block;
  width: fit-content;
`

export const getStaticProps = async () => {
  const parkPaths = await getParks()

  return {
    props: {
      parks: parkPaths.articlesCollection.items
    }
  }
}


export default function ParkDisplay({parks}){
  return(
    <div>
      Park Display
      {
        parks.map((p) => (
          <Link href={`/parks/${p.slug}`} passHref key={p.slug}>
            <ParkLink>
              {p.title}
            </ParkLink>
          </Link>
        ))
      }
    </div>
  )

} 