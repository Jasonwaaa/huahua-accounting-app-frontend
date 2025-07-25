import { FC, ReactNode } from 'react'
import Item from './components/Item'
import Divider from './components/Divider'

interface Props {
  children: ReactNode
}

const VerticalList: FC<Props> & {
  Item: typeof Item
  Divider: typeof Divider
} = ({ children }) => <ul className="space-y-4">{children}</ul>

VerticalList.Item = Item
VerticalList.Divider = Divider

export default VerticalList
