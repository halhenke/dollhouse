React = require "react"

MissingDoll = React.createClass
  render: ->
    <h2>Doll not found...</h2>


DollImage = React.createClass
  render: ->
    <div className="image-wrap">      
      <img className="img-responsive" src="{this.props.doll.image}"></img>
    </div>


FoundDoll = React.createClass
  componentWillMount: ->
    console.log "this.props"
    console.dir @props

  imageCheck: ->
    if doll.image
      <DollImage doll={@props.doll}/>

  render: ->    
    <div>
      <header>
        <h1>{@props.doll.name}</h1>
        <h5>
          Posted by  {@props.doll.owner.name.first} {@props.doll.owner.name.last}
        </h5>
      </header>
      <div className="doll">
        {@imageCheck()}
        {@props.doll.content.full}
      </div>
    </div>  


DollComponent = React.createClass
  componentWillMount: ->
    console.log "Comp Will Mount"
    @dollCheck()

  # componentDidMount: ->
  #   console.log "Comp Did Mount"
  #   @dollCheck()

  dollCheck: ->
    console.log "dollCheck - props: " 
    console.dir  @props
    console.dir  @props.doll
    if @props.doll
      @dolled = <FoundDoll doll={@props.doll}/>
    else
      @dolled = <MissingDoll/>
    
  render: ->
    # console.log "called"
    # console.dir {@dolled} 
    <div className="container">
      <div className="row">      
        <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
          <article>
            <p>
              <a href="'/dolls'">&larr; back to the dolls</a>
              <hr/>
              {
                if @props.doll.face
                  <h2>Coffeescript is magic!</h2>
                else
                  <h2>Coffeescript sucks!</h2>
              }
            </p>
          </article>        
        </div>        
      </div>        
    </div>  

# window.onload = ->
#   React.render <DollComponent {...sample_doll}/>, document.getElementById("reactiveDoll")
#   console.log "Window loaded and rendered"

module.exports = 
  DollComponent: DollComponent
