import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(

    @InjectRepository(User)
    private usersRepository: Repository<User>
) {}

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.usersRepository.create({
            username,
            password: hashedPassword
        });

        try {
            await this.usersRepository.save(user);

        } catch (error) {
            if (error.code === '23505'){
                throw new ConflictException('Username alreaedy exists.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async loginUser(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOneBy({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            return 'success';
        } else {
            throw new UnauthorizedException('Pleasae check your login creds.')
        }
    }
}