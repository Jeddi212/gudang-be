import inventoryRepository from '../repositories/inventory-repository';

const readAllInventories = async () => {
    return await inventoryRepository.readAllInventories()
}

export default {
    readAllInventories
}