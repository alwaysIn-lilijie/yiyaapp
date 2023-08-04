#import "AppDelegate.h"
//#import <DTShareKit/DTOpenKit.h>
//#import "RNDingTalkShareModule.h"
#import <React/RCTBundleURLProvider.h>


//@interface AppDelegate () <DTOpenAPIDelegate>
//@end


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"yiyaapp";
//  [DTOpenAPI registerApp:@"dingoaeonbffy7nrsb3dgw"];
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

//- (BOOL)application:(UIApplication *)application
//            openURL:(nonnull NSURL *)url
//  sourceApplication:(nullable NSString *)sourceApplication
//         annotation:(nonnull id)annotation {
//  if ([DTOpenAPI handleOpenURL:url delegate:self]) {
//        return YES;
//    }
//    return NO;
//}
//
//- (void)onReq:(DTBaseReq *)req {
//
//}
//
//
//- (void)onResp:(DTBaseResp *)resp {
//  RCTPromiseResolveBlock resolver = [RNDingTalkShareModule getSendLoginResolverStatic];
//    RCTPromiseRejectBlock rejecter = [RNDingTalkShareModule getSendLoginRejecterStatic];
//    if (resp.errorCode == DTOpenAPISuccess) {
//        DTAuthorizeResp *authResp = (DTAuthorizeResp *)resp;
//      //WeChat_Resp
//
//        NSString *accessCode = authResp.accessCode;
//      resolver([NSDictionary dictionaryWithObjectsAndKeys:accessCode,@"code", nil]);
//    } else {
//
//    }
//}

@end
