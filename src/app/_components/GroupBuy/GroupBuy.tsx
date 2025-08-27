import { FC, useState} from "react";
import Header from "./_components/Header";
import Modal from "@/_components/Modal";
import CreateGroupBuyForm from "./_components/CreateGroupBuyForm";


const GroupBuy:FC = () => {
    const [startGroupBuy, setStartGroupBuy] =useState(false);

    
    return(
        <div className="p-4">
            <Header onStartGroupBuy={() => setStartGroupBuy(true)} />
            Group Buy Component
            {startGroupBuy && (
                <Modal
                    title="Start Group Buy"
                    onClose={() => setStartGroupBuy(false)}
                >
                    <CreateGroupBuyForm 
                    />
                </Modal>
            )}
        </div>
    )
}

export default GroupBuy;