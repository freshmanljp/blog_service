import React from 'react'
import {
  Banner_Dc,
  MusicRecommand_Dc,
  LastestMusic_Dc,
  MvDiscovery_Dc
} from '../../../components'
import '../../../public/style/components/Discovery/Discover.css'

export default function Discovery(props) {
  return (
    <div>
      <Banner_Dc />
      <MusicRecommand_Dc />
      <LastestMusic_Dc handleClick={props.handleLastestClick}/>
      <MvDiscovery_Dc handleClick={props.handleMvClick}/>
    </div>
  )
}
