import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bookmark } from "./bookmark.entity";
import { BookmarkService } from "./bookmark.service";
import { BookmarkRepository } from "./bookmark.repository";
import { StoreRepository } from "../store/store.repository";
import { Store } from "../store/store.entity";


describe('BookmarkService', () => {
    let service: BookmarkService;
    let repository: BookmarkRepository;
    let storeRepository: StoreRepository;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([Bookmark, Store]),
                TypeOrmModule.forRoot({
                  type: 'sqlite',
                  database: ':memory:',
                  entities: [Bookmark, Store],
                  synchronize: true,
                }),
              ],
            providers: [BookmarkService, BookmarkRepository, StoreRepository],
        }).compile();
        service = module.get<BookmarkService>(BookmarkService)
        repository = module.get<BookmarkRepository>(BookmarkRepository)
        storeRepository = module.get<StoreRepository>(StoreRepository)
    });

    it('즐겨찾기 등록 성공', async () => {
        const userId = 1;
        const restaurantId = 1;
        const bookmark = { id: 1, restaurantId : restaurantId, userId : userId, isBookmarked : true }
        jest.spyOn(storeRepository, "existStoreById").mockResolvedValue(true);
        const spy = jest.spyOn(repository, 'save').mockResolvedValue(bookmark);
        expect(await service.addBookmark(userId, restaurantId, true)).toStrictEqual(bookmark);
        expect(spy).toBeCalledTimes(1);
    })

    it ('즐겨찾기 취소 성공',async () => {
        const userId = 1;
        const restaurantId = 1;
        jest.spyOn(storeRepository, "existStoreById").mockResolvedValue(true);
        const addedBookmark = await service.addBookmark(userId, restaurantId, true);

        const canceldBookmark = new Bookmark();
        canceldBookmark.id = addedBookmark.id
        canceldBookmark.userId = userId;
        canceldBookmark.restaurantId = restaurantId;
        canceldBookmark.isBookmarked = false;

        const received = await service.addBookmark(userId, restaurantId, false);
        expect(received).toStrictEqual(canceldBookmark)
    })

    it('즐겨찾기 등록 실패 - 존재하지 않는 매장', async () => {
        const userId = 1;
        const notExistStoreId = -1;
        jest.spyOn(storeRepository, "existStoreById").mockResolvedValue(false);
        expect(
            service.addBookmark(userId, notExistStoreId, true)
        ).rejects.toThrowError(
            new BadRequestException('존재하지 않는 매장입니다.')
        );
    })
})