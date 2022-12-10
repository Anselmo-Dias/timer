import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoImg} alt="" />

      <nav>
        <NavLink to="/" title="tempo">
          <Timer size={32} />
        </NavLink>
        <NavLink to="/history" title="historico">
          <Scroll size={32} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
