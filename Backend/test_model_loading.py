#!/usr/bin/env python3
"""
Test script to verify that the Isolation Forest model can be loaded correctly.
"""

import os
import sys
import joblib

def test_model_loading():
    """Test loading the isolation forest model."""
    
    # Get the current directory (should be sarthak_project)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Current directory: {current_dir}")
    
    # Path to the isolation forest model
    model_path = os.path.join(current_dir, 'isoforest_ucsd_ped1.pkl')
    print(f"Model path: {model_path}")
    
    # Check if the model file exists
    if os.path.exists(model_path):
        print("✓ Model file exists")
        
        try:
            # Try to load the model
            isolation_forest = joblib.load(model_path)
            print("✓ Model loaded successfully")
            
            # Print some basic information about the model
            print(f"Model type: {type(isolation_forest)}")
            
            # Check if it has the expected methods
            if hasattr(isolation_forest, 'decision_function'):
                print("✓ Model has decision_function method")
            else:
                print("✗ Model missing decision_function method")
                
            if hasattr(isolation_forest, 'predict'):
                print("✓ Model has predict method")
            else:
                print("✗ Model missing predict method")
                
            # Try to get model parameters
            try:
                params = isolation_forest.get_params()
                print(f"Model parameters: {params}")
            except Exception as e:
                print(f"Could not get model parameters: {e}")
                
            return True
            
        except Exception as e:
            print(f"✗ Error loading model: {e}")
            return False
    else:
        print(f"✗ Model file not found at: {model_path}")
        return False

def test_pca_loading():
    """Test loading the PCA model (optional)."""
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    pca_path = os.path.join(current_dir, 'pca_transformer.pkl')
    print(f"\nPCA path: {pca_path}")
    
    if os.path.exists(pca_path):
        print("✓ PCA file exists")
        
        try:
            pca = joblib.load(pca_path)
            print("✓ PCA loaded successfully")
            print(f"PCA type: {type(pca)}")
            
            if hasattr(pca, 'transform'):
                print("✓ PCA has transform method")
            else:
                print("✗ PCA missing transform method")
                
            return True
            
        except Exception as e:
            print(f"✗ Error loading PCA: {e}")
            return False
    else:
        print("ℹ PCA file not found (this is optional)")
        return True

if __name__ == "__main__":
    print("Testing model loading...")
    print("=" * 50)
    
    success = test_model_loading()
    test_pca_loading()
    
    print("=" * 50)
    if success:
        print("✓ Model loading test completed successfully!")
    else:
        print("✗ Model loading test failed!")
        sys.exit(1)
