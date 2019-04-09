import ShowBlocks from '../components/showBlocks'
import CheckBlocks from '../components/checkBlocks'

export default function Home() { 
  return (
    <React.Fragment>
      <h1>Cosmos Hub Blockchain</h1>
      <ShowBlocks />

      <style jsx global>
      {`
        h1 {
          font-family: Helvetica,Calibri,Arial,sans-serif;
        }
      `}
      </style>
    </React.Fragment>
  )
}