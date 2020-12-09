import React from 'react'
import ReactPlayer from 'react-player'
import '../../styles/responsive-player.css'


const ResponsivePlayer =({url})=> {
   return (
            <div className='player-wrapper'>
            <br />
              <ReactPlayer
                className='react-player'
                url={url}
                width='100%'
                height='100%'
                controls={true}
              />

            </div>
    )
}

export  default ResponsivePlayer
