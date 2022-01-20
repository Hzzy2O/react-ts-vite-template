import type { ErrorMessageMode } from '#/axios';
// import router from '/@/router';
// import { PageEnum } from '/@/enums/pageEnum';
// import { useUserStoreWithOut } from '../../store/modules/userStore';

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  // const userStore = useUserStoreWithOut();
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    case 401:
      // userStore.logout();
      break;
    default:
  }

}
