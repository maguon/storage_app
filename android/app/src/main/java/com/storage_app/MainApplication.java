package com.storage_app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
import com.shahenlibrary.RNVideoProcessingPackage;
import com.brentvatne.react.ReactVideoPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import android.support.multidex.MultiDexApplication;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNHTMLtoPDFPackage(),
            new RNVideoProcessingPackage(),
            new ReactVideoPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new PhotoViewPackage(),
            new OrientationPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new PickerPackage(),
            new BarcodeScannerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
