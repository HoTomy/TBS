import {Seeder} from "typeorm-extension";
import {DataSource} from "typeorm";
import {Staff} from "../../../entities/staff";

export default class StaffSeeder implements Seeder{
    public async run(
        dataSource: DataSource
    ): Promise<any>{
        const repos = dataSource.getRepository(Staff)
        if(await repos.count() === 0){
            await repos.insert([
                {staff_code: 'A0001'},
                {staff_code: 'A0002'},
                {staff_code: 'A0003'},
                {staff_code: 'A0004'},
                {staff_code: 'A0005'},
                {staff_code: 'A0006'},
                {staff_code: 'A0007'},
                {staff_code: 'A0008'},
                {staff_code: 'A0009'},
                {staff_code: 'A0010'}
            ])
        }
    }
}