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
  console.log(info)
  const router = useRouter()
  const pathName = router.pathname
  return(
    <div>
      {info.title}
    </div>
  )

} 