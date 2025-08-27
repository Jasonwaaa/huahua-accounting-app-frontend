import { FC } from "react";
import Button from "@/_components/Button";

interface Props {
    onStartGroupBuy: () => void
}

const Header: FC<Props> = ({ onStartGroupBuy }) => (
    <div className="p-4 border-b flex items-center justify-between">
        Group Buy Header
        <Button onClick={onStartGroupBuy}>Start Group Buy</Button>
    </div>
)

export default Header;