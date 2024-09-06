import { v4 as uuidv4} from 'uuid'

export class Transaction {
    id: string=uuidv4()
    s01?: string=''
    s02?: string=''
    //n01?: number=0
}
