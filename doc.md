# Weather Forecast App - API MAP

**add folder structure as /src => database,entity,weather/utils**  
**filled entity file like this :**

> import { Entity, PrimaryGeneratedColumn, Column from 'typeorm';
> @Entity('weather')  
> export class Currency {
>
> @PrimaryGeneratedColumn()  
> id: number;
>
> @Column()  
> country: string;
>
> @Column()  
> city: string;
>
> @Column()  
> weather: number;
> }

**set badRequestExeption if (weather == '') is service**

**choose database system (sqlite) , add datasource config and database module**

**add typeorm and migration setting in package.json**

**run migration:run**

**after create database and migration, define endpoits in controller , create module to connect to service logic (create asyn func in controller and call service faunction , define this function in service)**  
**add data to table weather s.th like this:**

`INSERT INTO weather (country, city, weather)
VALUES (Spain, madrid, 20),
(US, Kansas, 17),
(Estonia, Tallin , 7);`

**install swagger to see APIs system**

**define API to get /contries /cities /weather-forecast**

**in /contries /cities set data as @query or @param in url**

**in service cunstructor(){} inject repository as entity and define repository that access to data as :**

> @InjectRepository(Weather)  
> private readonly weatherRepository:Repository< Weather>,

**get data for /countries and /cities by use .find() in repository in logic place as service**

**to show /countries and /cities in controller after @get() we only call function about show list**

**in /weather-forecast set data by @query as send body in controller and destruct value from query like:**

> const { country,city } = query;

**define function in service and pass these data as input to it like:**

> const forecastWeather = await this.weatherService.forecastWeather(  
> country,  
> city,  
> );  
> return {  
> country,  
> city,  
> weather,  
> };

**use these value from country and city in service to get weather in database**

**define API to get /contries /cities /weather-forecast**

**output of "/countries" and "/cities" is ["string"]**

**output /weather-forecast is {"country":"spain","city":"madrid","temperature":7}**

**add @IsNotEmpty() , @IsString(), @ApiProperty() in request DTO from classvalidator and swagger, to handle validation and create input, in swagger to check data type response**

**create DTO for response to handle data type in response**
