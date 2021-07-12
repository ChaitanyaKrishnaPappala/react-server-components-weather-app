import marked from 'marked';


export default function App(props) {

  return (
    <div>
      <h3>
        Markdown content rendered on the server
      </h3>
      <div

        dangerouslySetInnerHTML={{
          __html: marked(props.mdText)
        }}>

      </div>
    </div>
  )
}

