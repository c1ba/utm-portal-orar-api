import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Curs, CursSchema } from "src/curs/curs.schema";
import { FacultateResolver } from "./facultate.resolver";
import { FacultateSchema } from "./facultate.schema";
import { FacultateService } from "./facultate.service";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Facultate', schema: FacultateSchema}, {name: 'Curs', schema: CursSchema}])],
    providers: [FacultateService, FacultateResolver]
})
export class FacultateModule {}