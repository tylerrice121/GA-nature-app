import { useRouter } from "next/router"
import { getParkInfo, getParkPaths } from "../../utils/contentful-helper"


export const getStaticPaths = async () => {
  const parkPaths = await getParkPaths()

  return {
    fallback: false,
    paths: parkPaths.articlesCollection.items.map((park) => ({ params: { parkName: park.slug }}))
  }
}

export const getStaticProps = async (context) => {
  const parkInfo = await getParkInfo(context.params.parkName)

  return {
    props: {
      info: parkInfo.articlesCollection.items[0]
    }
  }
}


export default function Park({info}){
  const router = useRouter()
  return(
    <div>
      {info.title}
      {
        info.reviewsCollection.items.length ?
        <p>
          There are reviews for this park.
        </p>
        :
        <p>
          There are no reviews for this park.
        </p>
      }
    </div>
  )

} 